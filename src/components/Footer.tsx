import metaInfo from "../AppData/metaInfo.json";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} {metaInfo.appName}. All rights reserved.
        </p>

        <p>
          Version{" "}
          <span className="font-medium text-gray-700">{metaInfo.version}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
