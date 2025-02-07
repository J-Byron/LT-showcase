const Home = () => {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Hello there 👋
          </h1>
          <p className="text-xl text-base-content/70">
            My name is
            <span className="text-primary font-bold">{" Josh Byron"}</span>,
            welcome to my technical showcase
          </p>
        </div>

        <div className="bg-base-100 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">About Me</h2>
          <p className="text-base-content/80 leading-relaxed">
            I'm a software developer with a love for creating elegant solutions
            to complex problems. When I'm not coding, you can find me [your
            interests/hobbies].
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
