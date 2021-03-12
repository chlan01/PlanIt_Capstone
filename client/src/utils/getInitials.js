//get first letter from first and last name. --> John Smith: 'JS'

const getInitials = (name) => {
  let initials = name.match(/\b\w/g) || [];
  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};

export default getInitials;
