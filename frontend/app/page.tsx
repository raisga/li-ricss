import Header from "@/app/components/Header";
import ChatSection from "@/app/components/ChatSection";

function Home() {
  const headerTitle = '(L)lama(I)ndex as a (R)hythmic (I)nsightful (C)reative (S)emantic (S)ystem';
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 background-gradient">
      <Header title={headerTitle} />
      <ChatSection />
    </main>
  );
}

export default Home;
