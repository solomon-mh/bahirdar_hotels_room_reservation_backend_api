// search by roomNumber, description
export function roomSearchQueryHelper(search: string) {
  return [
    {
      roomNumber: {
        $regex: search,
        $options: 'i',
      },
    },
    {
      description: {
        $regex: search,
        $options: 'i',
      },
    },
  ];
}
