import Image from "next/image"

export default function MoniPage() {


    return (
        <main className="h-full w-full">
            <div className="flex items-center justify-between gap-4 flex-wrap max-w-screen max-h-screen overflow-hidden">
                {
                    [...new Array(1000)].map((_, index) => {
                        return (<p key={index + ' moni'} className="w-fit h-fit text-4xl">Moni</p>)
                    })
                }


                <div className="absolute left-1/2 -translate-x-1/2">
                    <Image
                        src={'/images/moni.jpeg'}
                        width={500}
                        height={500}
                        alt="moni"
                        className="rounded-lg animate-grow"
                    ></Image>
                </div>
            </div>
        </main>
    )
}