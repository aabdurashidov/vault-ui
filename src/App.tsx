import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";

function App() {
  const [totalFiles, setTotalFiles] = useState(0)
  const [totalUsage, setTotalUsage] = useState(0)
  const [files, setFiles] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/files")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data)
        setTotalFiles(data.length);
        setTotalUsage(Number((data.reduce((acc: number, file: {
          size: number;
        }) => acc + file.size, 0) / 1024 / 1024).toFixed(2)));
      });
  }, []);

  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="mx-auto">
          <p className={'font-bold text-red-600 text-2xl'}>VAULT</p>
        </div>
      </header>
      <div className="grid gap-2 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-8 items-center max-w-7xl mx-auto">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">
                Total files
              </CardTitle>
              <CardDescription>All time</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFiles}</div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">
                Total usage
              </CardTitle>
              <CardDescription>All time</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage} MB</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
