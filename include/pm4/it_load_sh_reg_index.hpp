#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItLoadShRegIndexDef {
    static constexpr std::uint8_t opcode = 0x6f;
    static constexpr std::string_view name = "IT_LOAD_SH_REG_INDEX";
    static constexpr std::string_view desc = "Load indexed shader registers from GPU memory address";
};
}
