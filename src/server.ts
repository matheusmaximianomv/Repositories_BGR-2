import server from './app';

const URL: string = process.env.URL || 'http://localhost';
const PORT: string = process.env.PORT || '3333';

server.listen(PORT, () => {
  console.log(`Server Running in ${URL}:${PORT}`);
});
