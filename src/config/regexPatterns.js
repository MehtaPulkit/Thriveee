export const namePattern = {
  value: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i,
  message: "Please enter a valid value",
};

export const emailPattern={
    value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
    message:"Please enter a valid email"
}
export const mobilePattern={
    value:/^(\+?61|0)[1-9]\d{8}$/i,
    message:"Please enter a mobile number"
}