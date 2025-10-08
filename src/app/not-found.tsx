import Custom404 from "@/components/Custom404";

export default function NotFound() {
  return (
    <main className="w-full h-screen overflow-hidden p-4 lg:p-5">
      <div className="terminal-container | w-full max-w-[1920px] h-full overflow-y-scroll border-2 border-primary-clr rounded-md bg-foreground-clr p-2 mx-auto lg:p-4">
        <Custom404 />
      </div>
    </main>
  );
}
