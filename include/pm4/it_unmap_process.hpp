#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItUnmapProcessDef {
    static constexpr std::uint8_t opcode = 0xa2;
    static constexpr std::string_view name = "IT_UNMAP_PROCESS";
    static constexpr std::string_view desc = "Unmap process virtual address space from CP execution context";
};
}
