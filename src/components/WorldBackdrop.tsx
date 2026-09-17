import CityLights from "./CityLights";

/**
 * The continuous environment behind the whole page: a single long gradient that
 * carries the journey from dawn at the top through to a golden arrival at the
 * bottom, plus signal lights scattered the full length of it. Sits behind
 * everything as one unbroken world rather than a stack of flat-backgrounded
 * sections.
 */
export default function WorldBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div className="world-gradient absolute inset-0" />
      <CityLights />
    </div>
  );
}
