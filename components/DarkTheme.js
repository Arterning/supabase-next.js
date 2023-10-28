function DarkTheme() {
    return (
        <style jsx global>{`
          :root {
            --background-color: #0d1521;
            --text-color: rgb(230, 230, 230);
            --chart-color: rgb(255, 255, 255);
          }
        `}</style>
    );
}

export default DarkTheme;
