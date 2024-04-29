export default function ImageUploader({
  image,
  setImage,
  uploadText = '이미지 첨부',
}) {
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <label
      className="flex h-96 w-64 cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 text-center"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          document.getElementById('file-input').click();
        }
      }}
    >
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="h-full w-full rounded-lg object-cover object-center"
        />
      ) : (
        <div className="flex flex-col">
          <span className="text-xl text-gray-400">+</span>
          <span className="text-gray-400">{uploadText}</span>
        </div>
      )}
      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}
