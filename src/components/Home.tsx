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

        <h2 className="text-2xl font-semibold text-primary mb-4">
          How to run the project
        </h2>
        <p className="text-base-content/80 leading-relaxed mb-4">
          Once you have the project cloned on your machine, you can run the
          project locally by running the following command in your terminal:
        </p>
        <div className="mockup-code mb-12">
          <pre data-prefix="$">
            <code>npm i && npm run dev</code>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold text-primary mb-4">
          How to test the project
        </h2>
        <div className="mockup-code">
          <pre data-prefix="$">
            <code>npm run test</code>
          </pre>
        </div>
      </div>
    </main>
  );
};

export default Home;
