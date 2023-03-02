interface input_values{
  height_value : number;
  weight_value: number
}
const parseArguments = ( args: string[]) : input_values => {
  if ( args.length < 4) throw new Error('Not enough arguments')
  if( args.length > 4) throw new Error('Too many arguments')
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height_value: Number(args[2]),
      weight_value: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}
export const calculateBMI = (height: number, weight: number): string => {
  const height_in_meter = height/100
  const bmi = weight / ( height_in_meter * height_in_meter )
  if ( bmi < 18.5 ){
    return 'Malnourished'
  }
  else if ( bmi >=18.5 && bmi < 24.9){
    return 'Normal (healthy weight)'
  }else{
    return 'Not normal'
  }
}

try{
  const { weight_value, height_value } = parseArguments(process.argv)
  const result = calculateBMI(height_value, weight_value)
  console.log(result)
}catch( error: unknown){
  if (error instanceof Error) {
    console.log(error.message)
  }
}
// console.log(calculateBMI(180, 74))