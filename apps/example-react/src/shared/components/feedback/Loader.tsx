import React from 'react';
import Spinner from '../Spinner';

export default function Loader() {
  return (
    <section className="w-full h-screen fixed z-50 flex-center">
      <Spinner />
    </section>
  );
}
