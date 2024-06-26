import axios from "axios";
import { Observable } from "rxjs";

export function getAPICall(url, configData) {
  const observable$ = new Observable(function subscribe(subscriber) {
    axios
      .get(url, configData)
      .then((response) => {
        subscriber.next(response.data);
        // subsriber.complete is a way of unsubsribing
        subscriber.complete();
      })
      .catch((error) => {
        // subsriber.error is a way of unsubsribing
        subscriber.error(error);
      });
  });
  return observable$;
}

export function postAPICall(url, configData) {
  const observable$ = new Observable(function subscribe(subscriber) {
    axios
      .post(url, configData.body, configData)
      .then((response) => {
        subscriber.next(response.data);
        // subsriber.complete is a way of unsubsribing
        subscriber.complete();
      })
      .catch((error) => {
        // subsriber.error is a way of unsubsribing
        subscriber.error(error);
      });
  });
  return observable$;
}
