export function hotelSearchQueryHelper(search: string) {
  return [
    {
      name: {
        $regex: search,
        $options: 'i',
      },
    },
    {
      'address.city': {
        $regex: search,
        $options: 'i',
      },
    },
    {
      'address.subcity': {
        $regex: search,
        $options: 'i',
      },
    },
    {
      'address.woreda': {
        $regex: search,
        $options: 'i',
      },
    },
    {
      'address.street': {
        $regex: search,
        $options: 'i',
      },
    },
    {
      summary: {
        $regex: search,
        $options: 'i',
      },
    },
  ];
}
