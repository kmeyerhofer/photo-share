export default function promise(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject('Error reading file');
    };
    reader.readAsDataURL(file);
  });
}
