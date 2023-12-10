const Header = () => {
  return (
    <header>
      <div class="wrap header--flex">
        <h1 class="header--logo">
          <a href="index.html">Courses</a>
        </h1>
        <nav>
          <ul class="header--signedout">
            <li>
              <a href="sign-up.html">Sign Up</a>
            </li>
            <li>
              <a href="sign-in.html">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

/* SIGNEDOUT HEADER
   <header>
      <div class="wrap header--flex">
        <h1 class="header--logo">
          <a href="index.html">Courses</a>
        </h1>
        <nav>
          <ul class="header--signedout">
            <li>
              <a href="sign-up.html">Sign Up</a>
            </li>
            <li>
              <a href="sign-in.html">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
   </header>
*/

/*  SIGNEDIN HEADER
   <header>
      <div class="wrap header--flex">
         <h1 class="header--logo"><a href="index.html">Courses</a></h1>
         <nav>
            <ul class="header--signedin">
               <li>Welcome, Joe Smith!</li>
               <li><a href="sign-out.html">Sign Out</a></li>
            </ul>
         </nav>
      </div>
   </header>
*/
