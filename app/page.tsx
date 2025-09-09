import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <img
            src="https://cdn.prod.website-files.com/67167e56b8481bdcc6627a23/67851a3fb28810b531b768a8_Group%20995.svg"
            loading="lazy"
            width="150"
            height="150"
            alt="almă"
            className="mx-auto mb-4"
          />
          <p className="text-gray-600">Immigration Assessment Platform</p>
        </div>

        <div className="space-y-4">
          <Link href="/assessment" className="block">
            <Button className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer">
              Get An Assessment
            </Button>
          </Link>

          <Link href="/admin" className="block">
            <Button
              variant="outline"
              className="w-full bg-transparent cursor-pointer"
            >
              Admin Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
