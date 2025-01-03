class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private loadPromise: Promise<void> | null = null;
  private scriptElement: HTMLScriptElement | null = null;

  private constructor() {}

  static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  loadGoogleMaps(apiKey: string): Promise<void> {
    if (window.google?.maps) {
      return Promise.resolve();
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise((resolve, reject) => {
      try {
        this.scriptElement = document.createElement('script');
        this.scriptElement.type = 'text/javascript';
        this.scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        
        this.scriptElement.onload = () => {
          resolve();
        };
        
        this.scriptElement.onerror = (error) => {
          this.cleanup();
          reject(error);
        };

        document.head.appendChild(this.scriptElement);
      } catch (error) {
        this.cleanup();
        reject(error);
      }
    });

    return this.loadPromise;
  }

  cleanup(): void {
    if (this.scriptElement) {
      this.scriptElement.remove();
      this.scriptElement = null;
    }

    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const script = scripts[i];
      if (script.src.includes('maps.googleapis.com/maps/api')) {
        script.remove();
      }
    }

    if (window.google?.maps) {
      delete window.google.maps;
    }

    this.loadPromise = null;
  }
}

export default GoogleMapsLoader;