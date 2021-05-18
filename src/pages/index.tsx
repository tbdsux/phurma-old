import { NextPage } from 'next';

import { PageLayout } from '@layouts/PageLayout';
import { Container } from '@components/Container';
import { Color } from '@components/shared/colorizer';

const Index: NextPage = () => {
  return (
    <PageLayout pageTitle="phurma | Form Submission Using an API">
      <section className="py-20 text-center">
        <Container size="w-4/5">
          <h2 className="text-5xl font-black tracking-wide text-gray-800">
            Integrate <Color>Forms</Color> with an <Color>API</Color>
          </h2>
          <p className="py-8 text-xl tracking-wide text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sit beatae molestiae
            doloremque. Soluta rem odio, quo earum sint quia.
          </p>

          <div className="inline-flex mt-8 text-gray-800">
            <button className="mx-1 py-3 px-8 rounded-lg tracking-wide font-bold text-xl border-purple-500 border hover:text-purple-500">
              Learn More
            </button>
            <button className="mx-1 py-3 px-8 rounded-lg tracking-wide font-bold text-xl border-purple-500 border hover:bg-purple-500 hover:text-white">
              Sign Up
            </button>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default Index;
