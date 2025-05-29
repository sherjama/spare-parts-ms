import { Footer } from "../index.js";

const LandingPage = () => {
  return (
    <div className="w-full h-min flex items-center justify-center flex-col">
      <section className="w-full h-screen bg-[url('../public/assets/Posters/HeroBg.jpeg')] bg-cover bg-center bg-no-repeat"></section>
      <section className="w-full h-[50rem] bg-red-600/25"></section>
      <Footer />
    </div>
  );
};

export default LandingPage;
