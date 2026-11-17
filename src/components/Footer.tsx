import metaInfo from "../AppData/metaInfo.json";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center sm:gap-2 text-xs sm:text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} {metaInfo.appName}. All rights reserved.
        </p>
        <p>Version {metaInfo.version}</p>
      </div>
    </footer>
  );
};

export default Footer;
