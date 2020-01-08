const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  let favoriteBlog = null;
  let maximumLikes = 0;

  blogs.forEach(element => {
    if (element.likes >= maximumLikes) {
      favoriteBlog = element;
      maximumLikes = element.likes;
    }
  });
  return favoriteBlog === null
    ? null
    : {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
      };
};

const mostLikes = blogs => {
  let mostLikes = null;
  let maximumLikes = 0;

  blogs.forEach(element => {
    if (element.likes >= maximumLikes) {
      mostLikes = element;
      maximumLikes = element.likes;
    }
  });
  return mostLikes === null
    ? null
    : {
        author: mostLikes.author,
        likes: mostLikes.likes
      };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes
};
