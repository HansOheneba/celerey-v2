import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Script from "next/script";


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
   
  
     
      <main className="">{children}</main>

  
      <Script id="chatbase-loader" strategy="afterInteractive">
        {`
            (function(){
              if(!window.chatbase || window.chatbase("getState") !== "initialized"){
                window.chatbase = (...arguments) => {
                  if(!window.chatbase.q){window.chatbase.q=[]}
                  window.chatbase.q.push(arguments)
                };
                window.chatbase = new Proxy(window.chatbase, {
                  get(target, prop){
                    if(prop === "q"){ return target.q }
                    return (...args) => target(prop, ...args)
                  }
                });
              }
              const onLoad = function(){
                const script = document.createElement("script");
                script.src = "https://www.chatbase.co/embed.min.js";
                script.id = "HNRO7HdMQTKn9OIQUfoam"; // 👈 your Chatbase ID
                script.domain = "www.chatbase.co";
                document.body.appendChild(script);
              };
              if(document.readyState === "complete"){ onLoad() }
              else { window.addEventListener("load", onLoad) }
            })();
          `}
      </Script>

      
    </>
  );
}
