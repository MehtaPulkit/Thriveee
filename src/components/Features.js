function Features() {
  return (
    <section className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <div className="feature-desktop w-full flex">
        <div
          className="w-2/4 block p-6 
        rounded-lg  semi-white "
        >
          <h2 className="feature-heading">
            Empower Your Investments with
            <br /> Our Interactive Dashboard
          </h2>
          <p>
            Our interactive portal dashboard revolutionizes the way investors
            track and manage their investments. With intuitive tools and
            real-time data visualization, users gain unprecedented insight into
            their portfolios, empowering them to make informed decisions with
            confidence. From monitoring asset performance to analyzing
            historical trends, our dashboard offers a comprehensive overview of
            investment holdings, allowing users to stay ahead of the curve and
            seize opportunities for growth.
          </p>
        </div>
      </div>
      <div className="feature-mobile w-full">
        <div
          className="w-2/4 block p-6 
        border-none rounded-lg  semi-white "
        >
          <h2 className="feature-heading">
            Manage your investments <br /> Anywhere, Anytime!
          </h2>
          <p>
            In today's fast-paced world, flexibility is key, and our investment
            portal delivers just that. Our platform isn't bound by the
            constraints of a desktop computer; instead, it's optimized for
            mobile accessibility, empowering users to manage their investments
            on the go. Whether you're commuting to work, traveling abroad, or
            simply enjoying a coffee break, our mobile-friendly interface
            ensures that you can stay connected to your portfolio from anywhere
            in the world.
          </p>
        </div>
      </div>
    </section>
  );
}
export default Features;
