import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Denosaur } from "../types.ts";

let denosaurs: Denosaur[] = [
  {
    id: "1",
    name: "Diplodocus",
    description:
      "is a genus of diplodocid sauropod dinosaurs whose fossils were first discovered in 1877 by S. W. Williston.",
  },
  {
    id: "2",
    name: "Tyrannosaurus",
    description:
      " is a genus of coelurosaurian theropod dinosaur. The species Tyrannosaurus rex, often called T. rex or colloquially T-Rex, is one of the most well-represented of the large theropods.",
  },
  {
    id: "3",
    name: "Triceratops",
    description:
      "is a genus of herbivorous ceratopsid dinosaur that first appeared during the late Maastrichtian stage of the late Cretaceous period, about 68 million years ago in what is now North America.",
  },
];

// @desc    Get all denosaurs
// @route   GET /api/v1/denosaurs
const getDenosaurs = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: denosaurs,
  };
};

// @desc    Get single denosaur
// @route   GET /api/v1/denosaurs/:id
const getDenosaur = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const denosaur: Denosaur | undefined = denosaurs.find((d) =>
    d.id === params.id
  );

  if (denosaur) {
    response.status = 200;
    response.body = {
      success: true,
      data: denosaur,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No denosaur found",
    };
  }
};

// @desc    Add denosaur
// @route   POST /api/v1/denosaurs
const addDenosaur = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const denosaur: Denosaur = body.value;
    denosaur.id = v4.generate();
    denosaurs.push(denosaur);
    response.status = 201;
    response.body = {
      success: true,
      data: denosaur,
    };
  }
};

// @desc    Update denosaur
// @route   PUT /api/v1/denosaurs/:id
const updateDenosaur = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const denosaur: Denosaur | undefined = denosaurs.find((d) =>
    d.id === params.id
  );

  if (denosaur) {
    const body = await request.body();

    const updateData: { name?: string; description?: string } = body.value;

    denosaurs = denosaurs.map((d) =>
      d.id === params.id ? { ...d, ...updateData } : d
    );

    response.status = 200;
    response.body = {
      success: true,
      data: denosaurs,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No denosaur found",
    };
  }
};

// @desc    Delete denosaur
// @route   DELETE /api/v1/denosaurs/:id
const deleteDenosaur = (
  { params, response }: { params: { id: string }; response: any },
) => {
  denosaurs = denosaurs.filter((d) => d.id !== params.id);
  response.body = {
    success: true,
    msg: "Denosaur removed",
  };
};

export {
  getDenosaurs,
  getDenosaur,
  addDenosaur,
  updateDenosaur,
  deleteDenosaur,
};
