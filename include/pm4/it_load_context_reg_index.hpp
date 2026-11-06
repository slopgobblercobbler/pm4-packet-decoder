#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItLoadContextRegIndexDef {
    static constexpr std::uint8_t opcode = 0x70;
    static constexpr std::string_view name = "IT_LOAD_CONTEXT_REG_INDEX";
    static constexpr std::string_view desc = "Load indexed context registers from GPU memory address";
};
}
