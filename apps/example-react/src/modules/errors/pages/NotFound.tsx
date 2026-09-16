import Button from '@/shared/components/Button';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  const takeMeBack = () => {
    void navigate('/');
  };

  return (
    <section className="w-full flex items-center justify-center h-screen bg-secondary text-white relative overflow-hidden">
      <div className=" inset-0 fading-grid opacity-50 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-extrabold text-[12rem] md:text-[18rem] leading-none text-transparent bg-clip-text bg-linear-to-br from-primary via-white to-primary/40 drop-shadow-2xl select-none">
          404
        </h1>
        <h2 className="font-semibold text-3xl md:text-5xl mt-2 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-lg mt-6 mb-10">
          Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Button onClick={takeMeBack} className="px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
          Return Home
        </Button>
      </div>
    </section>
  );
}
