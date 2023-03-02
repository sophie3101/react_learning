interface summary{
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: number[], target_hour: number): summary=> {
  const average = (hours.reduce((accumulator, hour) => accumulator + hour, 0)) / hours.length
  // get only day of practice
  const filter_hours = hours.filter(h=> h!=0)
  const success = average < target_hour
  let rating
  let rating_description
  if (success){
    rating = 3
    rating_description = 'very good'
  }else if (!success && average >  1){
    rating = 2
    rating_description = 'ok but need to exercise more'
  }else{
    rating = 1
    rating_description = 'you need to exercise more'
  }
  return {
    periodLength: hours.length,
    trainingDays: filter_hours.length,
    success: success,
    rating: rating,
    ratingDescription: rating_description,
    target: target_hour,
    average: average
  }
}

interface arguments {
  hours: number[],
  target_hour: number
}

interface input_value {
  hours: number[],
  target_hour: number
}
const parseArgument = (args: string[]): input_value => {
  if ( args.length < 12) throw new Error('Not enough arguments')
  if( args.length > 12) throw new Error('Too many arguments')
  
  let input_hours = args.slice(3, 12)

  try{
    const target_hour = Number(args[2])
    const hours  = input_hours.map(h => Number(h))
    return {
      hours: hours,
      target_hour: target_hour
    }
  }catch(error: unknown){
    throw new Error('input is not number')
  }
}
parseArgument(process.argv)
try{
  const { hours, target_hour } = parseArgument(process.argv)
  const result = calculateExercises(hours, target_hour)
  console.log(result)
}catch( error: unknown){
  if (error instanceof Error) {
    console.log(error.message)
  }
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))