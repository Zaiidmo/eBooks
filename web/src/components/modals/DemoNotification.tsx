import { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { IS_DEMO_MODE } from '@/constants/demoData';
import { Button } from '../ui/button';
import { ExternalLink } from 'lucide-react';

export function DemoNotification() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (IS_DEMO_MODE) {
      const hasSeenNotice = localStorage.getItem('hasSeenDemoNotice');
      if (!hasSeenNotice) {
        setOpen(true);
      }
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenDemoNotice', 'true');
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="backdrop-filter backdrop-blur-2xl bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-white/10 shadow-2xl rounded-3xl sm:max-w-[500px]">
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle className="text-3xl font-black tracking-tighter text-black dark:text-white">
            Demo Version
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700 dark:text-gray-400 text-base leading-relaxed space-y-4">
            <p>
              This is a preview version of the <strong>eBooks</strong> platform. To ensure a smooth experience without backend latency:
            </p>
            <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-2xl space-y-2 border border-gray-200 dark:border-white/5">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-2 shrink-0" />
                <span>Browsing uses cached static data.</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-2 shrink-0" />
                <span>Cloud-native interactions (Uploads, Auth, DB) are mocked.</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-2 shrink-0" />
                <span>Form submissions are temporarily disabled.</span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button 
            variant="outline" 
            className="rounded-xl border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 order-2 sm:order-1"
            onClick={() => window.open('https://zaiid.moumni.uk/', '_blank')}
          >
            Contact Owner <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <AlertDialogAction 
            onClick={handleClose}
            className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded-xl px-8 font-bold order-1 sm:order-2"
          >
            Explore Demo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
