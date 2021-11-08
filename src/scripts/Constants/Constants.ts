export const key = "?api_key=29ab4f75bb2db1deeb32771398e6c025&language=en-US";
export const posterPlaceholder =
  "https://imgix.bustle.com/uploads/image/2017/8/29/c8c8077a-10fc-44d5-93f0-da4e592a299e-netflix-logo-print_pms.jpg";
export const posterBase = "https://image.tmdb.org/t/p/original";
export const netflixLogo =
  "https://static.wikia.nocookie.net/netflix/images/5/54/Netflix_logo.png/revision/latest?cb=20190623201834&path-prefix=ru";

export const setCategoriesList = (
  genres: {
    lab: string;
    val: string;
  }[]
) => {
  return [
    {
      label: "Categories",
      value: [
        { val: "top_rated", lab: "Top Rated" },
        { val: "popular", lab: "Popular" },
        { val: "upcoming", lab: "Upcoming" },
        { val: "now_playing", lab: "Now Playing" },
      ],
    },
    { label: "Genres", value: genres },
    {
      label: "Include Adult",
      value: [
        { lab: "Include", val: true },
        { lab: "Exclude", val: false },
      ],
    },
  ];
};

export const videoExtensions = [
  ".webm",
  ".mkv",
  ".flv",
  ".gif",
  ".gifv",
  ".mng",
  ".avi",
  ".mov",
  ".wmv",
  ".amv",
  ".mp4",
  ".mpg",
  ".mpeg",
  ".mpv",
  ".flv",
];

export const documentsExtensions = [
  ".csv",
  ".pdf",
  ".doc",
  ".docx",
  ".odt",
  ".html",
  ".htm",
  ".ppt",
  ".pptx",
  ".txt",
];
