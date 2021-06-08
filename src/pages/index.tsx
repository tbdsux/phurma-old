import { NextPage } from 'next';
import Image from 'next/image';

import { PageLayout } from '@layouts/PageLayout';
import { Container } from '@components/Container';
import { Color } from '@components/shared/colorizer';

const Index: NextPage = () => {
  return (
    <PageLayout pageTitle="phurma | Form Submission Using an API">
      <section className="py-40 text-center">
        <Container size="w-4/5">
          <h2 className="text-5xl font-black tracking-wide text-gray-700">
            Integrate <Color>Forms</Color> with an <Color>API</Color>
          </h2>
          <p className="p-8 text-xl tracking-wide text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sit beatae molestiae
            doloremque. Soluta rem odio, quo earum sint quia.
          </p>

          <div className="inline-flex flex-col sm:flex-row mt-8 text-gray-700">
            <button className="my-1 sm:my-0 mx-1 py-3 px-8 rounded-lg tracking-wide font-bold text-xl border-purple-500 border hover:text-purple-500">
              Learn More
            </button>
            <button className="my-1 sm:my-0 mx-1 py-3 px-8 rounded-lg tracking-wide font-bold text-xl border-purple-500 border hover:bg-purple-500 hover:text-white">
              Sign Up
            </button>
          </div>
        </Container>
      </section>

      <hr />

      <section className="py-16 text-center">
        <Container size="w-5/6">
          <h3 className="text-3xl text-indigo-500 tracking-wide leading-loose font-black">
            How does it work?
          </h3>
          <ul className="md:w-3/4 lg:w-full mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <li className="border border-indigo-300 rounded-lg relative">
              <span className="absolute -top-3 -left-2 p-3 text-lg font-bold bg-indigo-500 text-white rounded-xl">
                1
              </span>
              <Image src="/show/1.svg" width={300} height={300} />
              <hr />
              <h4 className="py-4 text-indigo-600">Create a Project</h4>
            </li>
            <li className="border border-indigo-300 rounded-lg relative">
              <span className="absolute -top-3 -left-2 p-3 text-lg font-bold bg-indigo-500 text-white rounded-xl">
                2
              </span>
              <Image src="/show/2.svg" width={300} height={300} />
              <hr />
              <h4 className="py-4 text-indigo-600">Use our API in your forms</h4>
            </li>
            <li className="border border-indigo-300 rounded-lg relative">
              <span className="absolute -top-3 -left-2 p-3 text-lg font-bold bg-indigo-500 text-white rounded-xl">
                3
              </span>
              <Image src="/show/3.svg" width={300} height={300} />
              <hr />
              <h4 className="py-4 text-indigo-600">Wait for responses</h4>
            </li>
          </ul>
        </Container>
      </section>
    </PageLayout>
  );
};

export default Index;
