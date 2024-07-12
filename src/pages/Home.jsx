import React, { useState, useRef } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export default function Home() {
  const [copySuccess, setCopySuccess] = useState(false);
  const inputRef = useRef(null);
  const treeRef = useRef(null);
  const [error, setError] = useState("");

  async function handleClick() {
    setCopySuccess(false);
    const repoUrl = inputRef.current.value;
    console.log(repoUrl)
    if (!repoUrl) {
      setError("Please enter a repository URL");
      return;
    }
    setError("");

    let repoPath = repoUrl.replace("https://github.com/", "");
    if (repoPath.includes("git")) {
      repoPath = repoPath.replace(".git", "");
    }
    console.log(repoPath);
    const apiUrl = `https://api.github.com/repos/${repoPath}/git/trees/main?recursive=1`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const treeData = processTreeData(data.tree);

      if (treeRef.current) {
        treeRef.current.innerText = treeData;
      }
    } catch (error) {
      console.error("Error fetching repository data:", error);
      setError("Failed to fetch repository data. Please check the URL and try again.");
    }
  }

  function processTreeData(tree) {
    const treeMap = {};
    tree.forEach((item) => {
      const pathParts = item.path.split("/");
      let currentLevel = treeMap;

      pathParts.forEach((part) => {
        if (!currentLevel[part]) {
          currentLevel[part] = {
            name: part,
            children: {},
            type: item.type,
          };
        }
        currentLevel = currentLevel[part].children;
      });
    });

    function formatTree(level, indent = "") {
      let result = "";
      Object.values(level).forEach((node) => {
        if (node.type === "tree") {
          result += `${indent}├── ${node.name}\n`;
          result += formatTree(node.children, `${indent}|\u00A0\u00A0\u00A0\u00A0\u00A0`);
        } else {
          result += `${indent}├── ${node.name}\n`;
        }
      });
      return result;
    }

    return formatTree(treeMap);
  }

  function handleCopy() {
    if (treeRef.current) {
      navigator.clipboard.writeText(treeRef.current.innerText);
      setCopySuccess(true);
    }
  }

  return (
    <main className="pt-2 px-2 min-h-screen flex flex-col justify-between w-full">
      <NavBar />
      <div className="lg:max-w-[50rem] max-w-[40rem] mx-auto pl-3 sm:pl-0">
        <div className="mr-10">
          <div className="">
            <div className="text-[2.50rem] font-extrabold">Visualize Your GitHub Repos.</div>
            <div className="text-base text-black/60 py-2 pl-2.5">
              GitTree allows you to create and visualize a repository tree-like structure from path data, providing a clear and intuitive view of your data’s hierarchy.
            </div>
          </div>
          <div className="flex justify-between pt-4 pl-2.5">
            <div className="w-full">
              <Input className="text-black w-full" ref={inputRef} type="text" placeholder="Enter repository URL" />
              {!!error && <div className="text-red-500 pl-2 text-sm font-medium">{error}</div>}
            </div>
            <Button className="ml-2 py-2.5 sm:ml-5 h-fit" onClick={handleClick} variant={"default"}>
              Generate
            </Button>
          </div>
        </div>
        <div className="relative min-w-[30rem] w-fit pl-1">
          <div
            ref={treeRef}
            className="relative bg-gray-800 text-white border m-2 rounded-lg p-8 font-medium text-sm leading-6 tracking-wide source-code-pro overflow-auto"
          >
            ├── public
            <br />
            | &nbsp;&nbsp;├── next.svg
            <br />
            | &nbsp;&nbsp;├── vercel.svg
            <br />
            ├── src
            <br />
            | &nbsp;&nbsp;├── app
            <br />
            | &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;├── globals.css
            <br />
            | &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;├── layout.tsx
            <br />
            | &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;├── page.tsx
            <br />
            | &nbsp;&nbsp;├── .eslintrc.json
            <br />
            | &nbsp;&nbsp;├── .gitignore
            <br />
            | &nbsp;&nbsp;├── next.config.js
            <br />
            | &nbsp;&nbsp;├── package-lock.json
            <br />
            | &nbsp;&nbsp;├── package.json
            <br />
            | &nbsp;&nbsp;├── postcss.config.js
            <br />
            | &nbsp;&nbsp;├── README.md
            <br />
            | &nbsp;&nbsp;├── tailwind.config.ts
            <br />
            | &nbsp;&nbsp;├── tsconfig.json
            <br />
          </div>
          <Button
            className={`absolute right-5 top-5 z-10 border-none text-white font-normal hover:text-none ${
              copySuccess ? " bg-green-500" : "bg-blue-500"
            }`}
            variant={copySuccess ? "outline" : "destructive"}
            onClick={handleCopy}
          >
            {copySuccess ? "copied!" : "copy"}
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
