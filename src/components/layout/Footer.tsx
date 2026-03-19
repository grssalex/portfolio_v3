export default function Footer() {
  return (
    <footer className="py-8 mt-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#666666] dark:text-[#888888] w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
      <p>© {new Date().getFullYear()} Alexandre. Tous droits réservés.</p>
      <div className="flex items-center gap-6">
        <a href="https://github.com/grssalex" target="_blank" rel="noopener noreferrer" className="hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
          GitHub
        </a>
        <a href="https://linkedin.com/in/grssalex" target="_blank" rel="noopener noreferrer" className="hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
