function ImgSlide({ imgs }) {
  return (
    <div className="grid grid-cols-1 gap-10 xl:gap-0 xl:grid-cols-3 w-full">
      {imgs.map((img, i) => (
        <img src={img.url} className="w-full h-full object-cover" key={i} />
      ))}
    </div>
  );
}

export default ImgSlide;
