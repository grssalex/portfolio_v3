export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-3 pt-8 pb-12 border-t border-[#E6E6E6] dark:border-[#222222] text-[13px] text-[#5F5F5F] dark:text-[#8F8F8F]">
      <span>© {new Date().getFullYear()} Alexandre Grosse</span>
      <span className="font-mono text-xs">self-hosted · raspberry pi</span>
    </footer>
  );
}
