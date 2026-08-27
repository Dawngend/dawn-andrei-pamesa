import { ThemeToggle } from "dawn-pamesa-portfolio";

export const Primary = () => <ThemeToggle />;

export const InNavBar = () => (
  <div className="flex items-center justify-between border border-line bg-surface px-4 py-3">
    <span className="label text-accent">Dawn Andrei Pamesa</span>
    <ThemeToggle />
  </div>
);
