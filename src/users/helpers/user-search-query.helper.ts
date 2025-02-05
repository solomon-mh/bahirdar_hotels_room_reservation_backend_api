// search by firstName, lastName, username, phoneNumber, address
export function userSearchQueryHelper(search: string) {
  return [
    { firstName: { $regex: search, $options: 'i' } },
    { lastName: { $regex: search, $options: 'i' } },
    { username: { $regex: search, $options: 'i' } },
    { phoneNumber: { $regex: search, $options: 'i' } },
    { 'address.city': { $regex: search, $options: 'i' } },
    { 'address.subcity': { $regex: search, $options: 'i' } },
    { 'address.woreda': { $regex: search, $options: 'i' } },
  ];
}
