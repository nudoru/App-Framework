export default function(condition, message, fatal) {
  if(!condition) {
    if(fatal) {
      throw new Error(message);
    } else {
      console.warn(message);
    }
  }
}