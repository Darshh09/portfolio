import { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState<{ used: number; total: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    // Start FPS measurement
    measureFPS();

    // Memory monitoring (if available)
    if ('memory' in performance) {
      const updateMemory = () => {
        const mem = (performance as any).memory;
        setMemory({
          used: Math.round(mem.usedJSHeapSize / 1024 / 1024),
          total: Math.round(mem.jsHeapSizeLimit / 1024 / 1024)
        });
      };

      const memoryInterval = setInterval(updateMemory, 2000);
      updateMemory();

      return () => {
        clearInterval(memoryInterval);
        cancelAnimationFrame(animationId);
      };
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Toggle visibility with Ctrl+Shift+P
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 45) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMemoryColor = (used: number, total: number) => {
    const percentage = (used / total) * 100;
    if (percentage < 70) return 'text-green-400';
    if (percentage < 90) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 text-white text-sm font-mono">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-slate-300">Performance Monitor</span>
        <span className="text-slate-500 text-xs">(Ctrl+Shift+P)</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">FPS:</span>
          <span className={getFPSColor(fps)}>{fps}</span>
        </div>

        {memory && (
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Memory:</span>
            <span className={getMemoryColor(memory.used, memory.total)}>
              {memory.used}MB / {memory.total}MB
            </span>
          </div>
        )}

        <div className="flex justify-between gap-4">
          <span className="text-slate-400">Load:</span>
          <span className="text-slate-300">
            {Math.round(performance.now() / 1000)}s
          </span>
        </div>
      </div>

      {/* Performance tips */}
      <div className="mt-3 pt-3 border-t border-slate-700/50">
        <div className="text-xs text-slate-500 space-y-1">
          <div>• FPS &lt; 30: Reduce animations</div>
          <div>• Memory &gt; 80%: Check for leaks</div>
          <div>• High load: Optimize components</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
