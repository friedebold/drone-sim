/* export const colors = {
	grey: "#D9D9D9",
};

// export const maxForce = 20; // kg m+2 s-2

export const gravitational_constant = 6.6743 * Math.pow(10, -11); // m3 kg-1 s-2
export const earth_mass = 5.972 * Math.pow(10, 24); // kg
export const earth_radius = 6371000; // m
export const aircraft_mass = 1; // kg */

export const LAT_DISTANCE = 50;
export const LON_DISTANCE = 50;

export const MAX_THRUST = 20;
export const MAX_THRUST_PER_SIDE = MAX_THRUST / 2;

export const margin = 30;

export const hover_thrust = 9.81 / 2;
export const thrust_differential = MAX_THRUST_PER_SIDE / 2; // Math.min(MAX_THRUST_PER_SIDE, 9.81 / 2);

/* 
def calculate_gravity(mass, altitude):
    gravitational_constant = -astro.G
    earth_mass = astro.M_earth.value * astro.M_earth.unit
    earth_radius = u.earthRad.to(u.m) * u.m

    gravity = ((gravitational_constant * earth_mass * mass) /
               (earth_radius + altitude)**2)

    return gravity
*/
