/**
 * Centralized error message extraction utility
 * Handles various error types and returns user-friendly messages
 */

export function extractErrorMessage(error: unknown): string {
  // Handle axios/HTTP errors
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as any).response === 'object' &&
    (error as any).response !== null
  ) {
    const response = (error as any).response;
    
    // Handle error message in response data
    if (response.data && typeof response.data === 'object') {
      if ('message' in response.data && typeof response.data.message === 'string') {
        return response.data.message;
      }
      if ('error' in response.data && typeof response.data.error === 'string') {
        return response.data.error;
      }
    }

    // Handle HTTP status codes
    if (response.status) {
      const statusMessages: { [key: number]: string } = {
        400: 'Requête invalide',
        401: 'Authentification requise',
        403: 'Accès refusé',
        404: 'Ressource non trouvée',
        409: 'Conflit (par ex. email déjà utilisé)',
        500: 'Erreur serveur',
        503: 'Service indisponible'
      };
      
      if (response.status in statusMessages) {
        return statusMessages[response.status];
      }
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle strings
  if (typeof error === 'string') {
    return error;
  }

  // Fallback for unknown errors
  return 'Une erreur inattendue est survenue';
}
