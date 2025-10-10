export const validateEmail=(email)=>{
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const getInitials=(name)=>{
  if(!name) return "";
  const words=name.split(" ");
  let initials="";

  for(let i=0;i<Math.min(words.length,2);i++){
    initials+=words[i][0];
  }
  return initials.toUpperCase();
}