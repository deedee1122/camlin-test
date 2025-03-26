import { Github, Linkedin, Mail } from "lucide-react";
import { Separator } from "../ui";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 mt-10">
      <div className="container max-w-7xl mx-auto px-6 py-8">
        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-2">
              Transformer Monitoring Dashboard
            </h3>
            <p className="text-sm text-muted-foreground">
              Created with ❤️ by <span className="font-semibold">Diran</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © {currentYear} All rights reserved
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/deedee1122"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/diran-dapo-9bb7bb196/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:oojedapo@aol.co.uk"
                className="hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available for hire
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-6">
            <div className="flex items-center text-xs text-muted-foreground">
              <span>React</span>
              <span className="mx-1.5">•</span>
              <span>TypeScript</span>
              <span className="mx-1.5">•</span>
              <span>Tailwind CSS</span>
              <span className="mx-1.5">•</span>
              <span>shadcn/ui</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium shadow-lg transform transition-transform hover:scale-105">
              <span className="flex items-center gap-1.5">
                <Github className="h-3.5 w-3.5" />
                <a
                  href="https://github.com/deedee1122/camlin-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Star this project on GitHub
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
