import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm text-center md:text-left">&copy; {new Date().getFullYear()} SGM Feedback System. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/privacy-policy">
            <a className="hover:text-gray-400 transition">Privacy Policy</a>
          </Link>
          <Link href="/terms-of-service">
            <a className="hover:text-gray-400 transition">Terms of Service</a>
          </Link>
          <Link href="/contact">
            <a className="hover:text-gray-400 transition">Contact</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
