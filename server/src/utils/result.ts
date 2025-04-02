import { Result } from "src/result/result";

export const handleRespond = <T>(handler: () => T) => {
  try{
    const res = handler()
    return Result.success(res)
  }catch(error){
    console.error(error);
    return Result.fail(String(error)) as Result<T>
  }
}