export async function GET() {
  const videos = [
    {
      title: "Pumpkin Halloween Card",
      category: "Seasonal Holidays",
      subcategory: "Halloween",
      src: "/cards/pumpkin.mp4",
    },
    {
      title: "Santa Christmas Card",
      category: "Seasonal Holidays",
      subcategory: "Christmas",
      src: "/cards/santa.mp4",
    },
    {
      title: "Romantic Love Card",
      category: "Love & Romance",
      subcategory: "Valentine",
      src: "/cards/love.mp4",
    },
    {
      title: "Birthday Surprise Card",
      category: "Birthday",
      subcategory: "Friends",
      src: "/cards/birthday.mp4",
    },
    {
      title: "Dog and Cat Card",
      category: "Animals",
      subcategory: "Pets",
      src: "/cards/pets.mp4",
    },
  ];

  return Response.json({ videos });
}
