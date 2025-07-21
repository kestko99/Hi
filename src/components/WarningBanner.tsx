export default function WarningBanner() {
  return (
    <div className="bg-surface/80 backdrop-blur-md px-6 py-4 border-b border-white/5">
      <p className="text-sm leading-relaxed">
        Don't invest unless you're prepared to lose all the money you invest. This is a high-risk investment and you are unlikely to be protected if something goes wrong.{' '}
        <a href="#" className="text-primary hover:underline">
          Take 2 mins to learn more
        </a>
      </p>
    </div>
  );
}