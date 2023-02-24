import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '32167843-8e8cdf0804a85ffadb96a7b65',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});
const fetchImages = async (q, page = 1) => {
  const { data } = await instance.get(`/`, {
    params: {
      q,
      page,
      per_page: 12,
    },
  });
  return data;
};
// const fetchImages = async (q, page, per_page) => {
//   let searchParams = new URLSearchParams({
//     q,
//     page,
//     per_page,
//   });

//   try {
//     const { data } = await instance.get(`/?${searchParams}`);
//     return data;
//   } catch (error) {
//     Report.failure('Something went wrong, please try again', error.message);
//   }
// };

export default fetchImages;
